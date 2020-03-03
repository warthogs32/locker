using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reactive.Linq;
using System.Resources;
using System.Threading.Tasks;
using System.Threading;
using System.Net.Http;
using System.IO.Ports;
using Firebase.Database;
using Firebase.Database.Query;
using Firebase.Database.Offline;
using Firebase.Auth;

namespace LockStateConsumer
{
    class Program
    {
        public static FirebaseClient FirebaseConnector = new FirebaseClient(Properties.Resources.url,
                new FirebaseOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(Properties.Resources.secret)
                });

        public static string Lockstate = string.Empty;
        public static string ArduinoToFirebase = string.Empty;
        public static void Main(string[] args)
        {
            SerialPort port;
            bool run = true;

            Console.CancelKeyPress += delegate (object sender, ConsoleCancelEventArgs e)
            {
                e.Cancel = true;
                run = false;

            };

            port = new SerialPort("COM4", 9600);
            port.Open();
            var ultrasonicDb = FirebaseConnector.Child("ultrasonic").AsRealtimeDatabase<string>("", "", StreamingOptions.LatestOnly, InitialPullStrategy.MissingOnly, true);

            while (run)
            {
                ToArduino(port);
                ToFirebase(port, ultrasonicDb);
            }
            port.Close();
            Console.WriteLine("exited");
            
        }

        public static void ToArduino(SerialPort sp)
        {
            var observable = FirebaseConnector.Child("lockstate").AsObservable<string>().Subscribe(d => Lockstate = d.Object);
            Console.WriteLine(Lockstate);
            if (Lockstate == "locked")
            {
                sp.Write("l");
            }
            if (Lockstate == "unlocked")
            {
                sp.Write("u");
            }
        }

        public static void ToFirebase(SerialPort sp, RealtimeDatabase<string> db)
        {
            ArduinoToFirebase = sp.ReadLine();
            Console.WriteLine(ArduinoToFirebase);
            var postToFirebase = db.Post(ArduinoToFirebase);
        }
    }
}
