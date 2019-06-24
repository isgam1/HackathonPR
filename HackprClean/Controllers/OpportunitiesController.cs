using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace HackprClean.Controllers
{
    public class OpportunitiesController : Controller
    {
        // GET: Opportunities
        public ActionResult Opportunities()
        {
            return View();
        }

        [HttpPost]
        public ActionResult TwilioMessageData(Models.FormData formData)
        {
            string accountSid = "AC6300bd895a5a9838a6812e7292d004a2";
            string authToken = "316ec6e2de703f89efa8fcf9cd56e927";

            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Create(
                body: formData.TextBoxStringData,
                from: new Twilio.Types.PhoneNumber("whatsapp:+14155238886"),
                to: new Twilio.Types.PhoneNumber("whatsapp:+17875257664")
            );


            return View("~/Views/Home/Index.cshtml");

        }
    }
}