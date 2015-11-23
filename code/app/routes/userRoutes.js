module.exports = function(app, express) {

    var apiRouter = express.Router();

    // on routes that end in /users
    // ----------------------------------------------------
    apiRouter.route('/users')


        // create a user (accessed at POST http://localhost:3000/form)
        .post(function(req, res) {

            var user = new User();		
            user.field      = req.body.field;
			user.team       = req.body.team;
			user.f_name     = req.body.f_name;  
            user.t_name     = req.body.t_name;     
            user.item1      = req.body.item1;  
            user.item1_c    = req.body.item1_c;  
            user.item2      = req.body.item2;   
            user.item2_c    = req.body.item2_c; 
            user.item3      = req.body.item3;   
            user.item3_c    = req.body.item3_c;    
            user.item4      = req.body.item4;   
            user.item4_c    = req.body.item4_c;  
            user.item5      = req.body.item5;  
            user.item5_c    = req.body.item5_c;  
            user.item6      = req.body.item6;  
            user.item6_c    = req.body.item6_c;  
            user.item7      = req.body.item7;  

            user.save(function(err) {
                if (err) {
                    // duplicate entry
                    if (err.code == 11000)
                        return res.json({ success: false, message: 'A user with that username already exists. '});
                    else
                        return res.send(err);

                }

                // return a message

                res.json({ message: 'User created!' });
            });

        })

        // get all the users (accessed at GET http://localhost:3000/api/users)
        .get(function(req, res) {

            User.find({}, function(err, users) {
                if (err) res.send(err);

                // return the users
                res.json(users);
            });
        });

   
    return apiRouter;
};
