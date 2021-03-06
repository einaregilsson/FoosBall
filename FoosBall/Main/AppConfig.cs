﻿namespace FoosBall.Main
{
    using System.Configuration;
    using System.Linq;

    using FoosBall.Models.Base;
    using FoosBall.Models.Domain;

    public static class AppConfig
    {
        public static void InitalizeConfig()
        {
            var environment = GetEnvironment();
            var configCollection = new Db(environment).Dbh.GetCollection<Config>("Config");
            var config = configCollection.FindAll().FirstOrDefault();

            if (config == null)
            {
                config = new Config();
                configCollection.Save(config);
            }
        }

        public static Environment GetEnvironment()
        {
            Environment environment;
            var environmentString = ConfigurationManager.AppSettings["Environment"];

            switch (environmentString)
            {
                case "Production":
                    environment = Environment.Production;
                    break;
                case "Staging":
                    environment = Environment.Staging;
                    break;
                default:
                    environment = Environment.Local;
                    break;
            }

            return environment;
        } 
    }
}