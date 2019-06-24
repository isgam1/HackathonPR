using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(HackprClean.Startup))]
namespace HackprClean
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
