﻿using System;
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
        static void Main(string[] args)
        {
            string lockstate = string.Empty;
            SerialPort port;
            string arduinoToFirebase = string.Empty;

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
            var ultrasonicDb = firebase.Child("ultrasonic").AsRealtimeDatabase<string>("", "", StreamingOptions.LatestOnly, InitialPullStrategy.MissingOnly, true);

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
                port.Close();
                Thread.Sleep(100);
                port.Open();
                arduinoToFirebase = string.Empty;
                arduinoToFirebase = port.ReadLine();
                Console.WriteLine(arduinoToFirebase);
                var postToFirebase =  ultrasonicDb.Post(arduinoToFirebase);
                arduinoToFirebase = string.Empty;
                port.Close();
                Thread.Sleep(100);
                port.Open();
            }
            port.Close();
            Console.WriteLine("exited");
            
        }
    }
}
