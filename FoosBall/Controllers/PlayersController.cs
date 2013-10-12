namespace FoosBall.Controllers
{
    using System.Linq;
    using System.Web.Mvc;
    using Models.Domain;
    using MongoDB.Driver.Builders;

    public class PlayersController : BaseController
    {
        public ActionResult Index()
        {
            return View("Index");
        }

        public ActionResult GetPlayers()
        {
            var playerCollection = Dbh.GetCollection<Player>("Players")
                                        .FindAll()
                                        .SetSortOrder(SortBy.Descending("Rating"))
                                        .Where(x => x.Played > 0 && x.Deactivated == false)
                                        .ToList();

            return Json(playerCollection, JsonRequestBehavior.AllowGet);
        }
    }
}