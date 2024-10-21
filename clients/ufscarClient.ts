type SaldoResponse = {
  saldo: number;
  servidorOnline: boolean;
};

const ufscarClient = {
  getRUBalance: (ufscarToken: string) => {
    const url =
      "https://sistemas.ufscar.br/sagui-api/integracoes/pwacesso/consultar-saldo";
    return new Promise<number>(async (resolve, reject) => {
      try {
        const call = await fetch(url, {
          headers: { Authorization: `Basic ${ufscarToken}` },
        });

        const saldo = (await call.json()) as SaldoResponse;
        if (saldo.servidorOnline && typeof saldo.saldo === "number") {
          return resolve(saldo.saldo);
        }

        return resolve(-1);
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default ufscarClient;
