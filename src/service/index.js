import { ipcMain } from "electron";

let inited = false;
export function init() {
  if (inited) {
    return;
  }
  inited = true;
  console.log("api-channel init", invoke);
  ipcMain.handle("api-channel", async (event, api, ...args) => {
    console.log(api, ...args);
    return invoke(api, ...args);
  });
}

const ServiceRegistry = {};

export function addService(name, service) {
  ServiceRegistry[name] = service;
}

export function invoke(name, ...args) {
  const service = ServiceRegistry[name];
  return service(...args);
}
