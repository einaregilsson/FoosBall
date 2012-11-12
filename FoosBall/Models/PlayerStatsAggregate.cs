﻿namespace FoosBall.Models
{
    public class BestFriendForever
    {
        public BestFriendForever()
        {
            this.Occurrences = 1;
        }

        public Player Player { get; set; }

        public int Occurrences { get; set; }
    }

    public class RealBestFriendForever
    {
        public RealBestFriendForever()
        {
            this.Occurrences = 1;
        }

        public Player Player { get; set; }

        public int Occurrences { get; set; }
    }

    public class EvilArchEnemy
    {
        public EvilArchEnemy()
        {
            this.Occurrences = 1;
            this.GoalDiff = 0;
        }

        public Player Player { get; set; }

        public int GoalDiff { get; set; }

        public int Occurrences { get; set; }
    }

    public class PreferredColor
    {
        public string Color { get; set; }

        public int Occurrences { get; set; }
    }

    public class WinningColor
    {
        public string Color { get; set; }

        public int Occurrences { get; set; }
    }
}