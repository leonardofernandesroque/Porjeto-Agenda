const Login = require('../models/loginModel');


exports.index = (req,res) =>{
    if(req.session.user) return res.render('login-logado');    

    res.render ('login');
}

exports.register = async function(req, res) {
    try{
        const login = new Login(req.body);
        await login.register();

        if(login.error.length > 0) {
            req.flash('error', login.error);
            req.session.save(function(){
                return res.redirect('index');
            });
            return;
        }

        req.flash('success', 'Seu usuario foi criado com sucesso.');
        req.session.save(function(){
            return res.redirect('index');
        });
    }catch(e){
        console.log(e);
        res.render('404');
    }
};

exports.login = async function(req, res) {
    try{
        const login = new Login(req.body);
        await login.login();

        if(login.error.length > 0) {
            req.flash('error', login.error);
            req.session.save(function(){
                return res.redirect('index');
            });
            return;
        }

        req.flash('success', 'Você entrou no sistema.');
        req.session.user = login.user;
        req.session.save(function(){
            return res.redirect('index');
        });
    }catch(e){
        console.log(e);
        res.render('404');
    }
};

exports.logout = function(req, res){
    req.session.destroy();
    res.redirect('/');
}