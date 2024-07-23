import Evento from '../models/evento.js';
import unsleash from '../services/unleash.js';

class EventosController {
  static liberaAcessoEventos = () => unsleash.isEnabled('eventos');

  static listarEventos = async (req, res) => {
    if (this.liberaAcessoEventos()) {
      try {
        const resultado = await Evento.pegarEventos();

        return res.status(200).json({ eventos: resultado });
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    }

    return res.status(404).send();
  };
}

export default EventosController;
