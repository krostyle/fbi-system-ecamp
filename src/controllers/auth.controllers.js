const { response, request } = require('express');
const { results: agentes } = require('../data/agentes');
const jwt = require('jsonwebtoken');


const signin = async(req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const user_email = agentes.find(u => u.email === email);
        if (!user_email) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        const user_password = agentes.find(u => u.password === password);
        if (!user_password) {
            return res.status(404).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }
        //Generar jwt
        const token = jwt.sign({
            user: user_email.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.render('partials/index', {
            user: user_email.email,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, no se pudo generar JWT'
        });
    }
}



const renderDashboard = async(req = request, res = response) => {
    res.render('partials/dashboard', {
        user: req.user
    });
}


module.exports = {
    signin,
    renderDashboard
}