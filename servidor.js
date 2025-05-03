import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(__dirname)); // sirve index.html

app.post('/registro', (req, res) => {
    const nuevoUsuario = req.body;

    const archivo = path.join(__dirname, 'usuarios.json');
    let usuarios = [];

    if (fs.existsSync(archivo)) {
        const datos = fs.readFileSync(archivo, 'utf8');
        usuarios = JSON.parse(datos || '[]');
    }

    usuarios.push(nuevoUsuario);
    fs.writeFileSync(archivo, JSON.stringify(usuarios, null, 2));
    res.send('Usuario registrado con éxito');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
