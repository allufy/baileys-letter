import makeWASocket from './Socket/index.js';
import chalk from "chalk";

console.log(chalk.hex("#00d4aa")(`
 ██████╗ ██████╗██╗  ██╗ ██████╗ ██╗   ██╗ ██████╗ ██╗██████╗ 
██╔═══██╗██╔════╝██║  ██║██╔═══██╗██║   ██║██╔═══██╗██║██╔══██╗
██║   ██║██║     ███████║██║   ██║██║   ██║██║   ██║██║██║  ██║
██║   ██║██║     ██╔══██║██║   ██║╚██╗ ██╔╝██║   ██║██║██║  ██║
╚██████╔╝╚██████╗██║  ██║╚██████╔╝ ╚████╔╝ ╚██████╔╝██║██████╔╝
 ╚═════╝  ╚═════╝╚═╝  ╚═╝ ╚═════╝   ╚═══╝   ╚═════╝ ╚═╝╚═════╝ 
`));

console.log(chalk.hex("#00d4aa").bold("OCHOVOID") + chalk.gray(" — a Baileys-based WhatsApp Web library\n"));
console.log(chalk.gray("Dapatkan update terbaru seputar OCHOVOID & Baileys:"));
console.log(chalk.hex("#25D366")("https://whatsapp.com/channel/0029Vb6hMhm7NoZyT60VSs0e\n"));

export * from '../WAProto/index.js';
export * from './Utils/index.js';
export * from './Types/index.js';
export * from './Defaults/index.js';
export * from './WABinary/index.js';
export * from './WAM/index.js';
export * from './WAUSync/index.js';
export * from './Store/index.js';
export { makeWASocket };
export default makeWASocket;
//# sourceMappingURL=index.js.map
