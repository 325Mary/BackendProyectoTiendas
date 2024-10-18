const checkPerfil = (perfilesPermitidos) => {
    return (req, res, next) => {
        try {
            // Verifica si el usuario está autenticado y tiene un perfil válido
            if (!req.user || !req.idperfil || !perfilesPermitidos.includes(req.idperfil)) {
                return res.status(403).json({ error: 'Acceso prohibido', idperfil});
            }

            // Si el perfil es válido, permite continuar con la solicitud
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error en validar el perfil' });
        }
    };
};

module.exports = checkPerfil;
