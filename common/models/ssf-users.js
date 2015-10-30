
var path = require('path');
module.exports = function(SsfUsers) {

 /*   SsfUsers.observe('after save', function(ctx, next) {
        console.log("after save");
        if(ctx.isNewInstance === true) {
            var instance = ctx.instance;
            instance.createAccessToken(1200000, function(err, response) { 
                console.log(JSON.stringify(response));
                console.log(JSON.stringify(err));
                if(err === null) {
                    ctx.instance["token"] = response.id;
                }
                next();
            });
           
        }else {
             next();
        }
       
    });*/
    SsfUsers.afterRemote('create', function(context, user, next) {
        console.log('> user.afterRemote triggered');
        var options = {
          type: 'email',
          to: user.email,
          from: 'noreply@softstackfactory.com',
          subject: 'Thanks for registering.',
          template: path.resolve(__dirname, '../../server/views/verify.ejs'),
          redirect: '/verified',
          user: user,
          host: 'https://tktestapp.herokuapp.com/'
        };
        user.verify(options, function(err, response) {
          if (err) {
              console.log(JSON.stringify(err));
            next(err);
            return;
          }
          console.log('> verification email sent:', response);
          console.log(context.res);
          context.res.render('response', {
            title: 'Signed up successfully',
            content: 'Please check your email and click on the verification link '
              + 'before logging in.',
            redirectTo: '/',
            redirectToLinkText: 'Log in'
          });
        });
    });
};
