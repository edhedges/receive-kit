import { HttpProvider } from "web3x/providers";
import { Eth } from "web3x/eth";
import AttestationLogicABI from "./AttestationLogicABI";

const abiDecoder = require("abi-decoder");
abiDecoder.addABI(AttestationLogicABI);

type IDecodedLogEvent = {
  name: string;
  type: string;
  value: string;
};
export type TDecodedLog = {
  address: string;
  name: string;
  events: IDecodedLogEvent[];
};

export const getDecodedTxEventLogs = async (
  provider: string,
  txHash: string
): Promise<TDecodedLog[]> => {
  const httpProvider = new HttpProvider(provider);
  const ethClient = Eth.fromProvider(httpProvider);
  const txReceipt = await ethClient.getTransactionReceipt(txHash);
  return abiDecoder.decodeLogs(txReceipt.logs) as TDecodedLog[];
};

export const getDecodedLogValueByName = (
  decodedLog: TDecodedLog,
  name: string
): string | undefined => {
  const event = decodedLog.events.find(e => e.name === name);
  return event && event.value;
};
