using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Resources;
using System.Threading.Tasks;
using Firebase.Database;
using Firebase.Database.Query;

namespace LockStateConsumer
{
    class Program
    {
        static void Main(string[] args)
        {
            string auth = Properties.Resources.secret;
            var firebaseClient = new FirebaseClient(Properties.Resources.url, new FirebaseOptions
            {
                AuthTokenAsyncFactory = () => Task.FromResult(auth)
            });

            while (true)
            {
                var locks = firebaseClient.Child("lockstate").AsObservable<LockStateEnum>().Subscribe(s => Console.WriteLine(s));
            }
        }
    }
}
