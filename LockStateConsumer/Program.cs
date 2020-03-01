using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reactive.Linq;
using System.Resources;
using System.Threading.Tasks;
using System.IO.Ports;
using Firebase.Database;
using Firebase.Database.Query;
using Firebase.Auth;

namespace LockStateConsumer
{
    class Program
    {
        static void Main(string[] args)
        {
            string lockstate = string.Empty;
            SerialPort port;

            bool run = true;

            Console.CancelKeyPress += delegate (object sender, ConsoleCancelEventArgs e)
            {
                e.Cancel = true;
                run = false;

            };

            port = new SerialPort("COM7", 9600);
            port.Open();
            var firebase = new FirebaseClient(Properties.Resources.url,
                new FirebaseOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(Properties.Resources.secret)
                });

            while (run)
            {
                var observable = firebase.Child("lockstate").AsObservable<string>().Subscribe(d => lockstate = d.Object);
                Console.WriteLine(lockstate);
                if (lockstate == "locked")
                {
                    port.Write("l");
                }
                if (lockstate == "unlocked")
                {
                    port.Write("u");
                }
            }
            port.Close();
            Console.WriteLine("exited");
            
        }
    }
}
