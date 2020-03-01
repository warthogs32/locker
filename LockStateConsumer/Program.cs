using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reactive.Linq;
using System.Resources;
using System.Threading.Tasks;
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
            var firebase = new FirebaseClient(Properties.Resources.url,
                new FirebaseOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(Properties.Resources.secret)
                });

            while (true)
            {
                var observable = firebase.Child("lockstate").AsObservable<string>().Subscribe(d => lockstate = d.Object);
                Console.WriteLine(lockstate);
            }


        }
    }
}
