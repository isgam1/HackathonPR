using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HackprClean.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Thank you for wanting to know about us!";

            return View();
        }

        public ActionResult Account()
        {
            ViewBag.Message = "Account";

            return View();
        }

        public ActionResult Opportunities()
        {
            ViewBag.Message = "You got to Opportunities";

            return View();
        }
    }
}