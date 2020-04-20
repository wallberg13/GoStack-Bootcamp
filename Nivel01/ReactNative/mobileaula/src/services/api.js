import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.113:3333",
});

export default api;

/**
 * iOS com Emulador: localhost
 * iOS com físico: IP da máquina
 * Android com Emulador (com adb reverse):
 *  -> O emulador do Android, por ser emulado, ele não enxerga o seu localhost como a propria máquina.
 *  -> Por isso, ele faz um redirecionamento de porta.
 *  -> adb reverse tcp:3000 tcp:3000
 * Android com Emulador: 10.0.2.2 (Android Studio)
 * Android com Emulador: 10.0.3.2 (Genymotion)
 * Android com físico: IP da máquina
 */
