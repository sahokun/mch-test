/**
 * ERC20コントラクトの最小限のラッパー。
 *
 * 元々は typechain(`@typechain/web3-v1`)による自動生成コードだったが、
 * web3 v4 移行(Issue #9/#10)に伴い @typechain/web3-v1 が web3 v4 非対応のため、
 * 手書きの最小限の型定義に置き換えた。
 *
 * 呼び出し側(contractFactory系)で Contract生成時に
 * `{ number: FMT_NUMBER.STR, bytes: FMT_BYTES.HEX }` を指定しているため、
 * web3 v4のデフォルト(数値をbigintで返す)ではなく、v1と同じ文字列で値が返る。
 */
export interface Erc20MethodCall<T> {
  call(): Promise<T>;
}

export interface Erc20 {
  methods: {
    balanceOf(account: string): Erc20MethodCall<string>;
    decimals(): Erc20MethodCall<string>;
    symbol(): Erc20MethodCall<string>;
    totalSupply(): Erc20MethodCall<string>;
  };
}

export class ContractErc20Wrapper {
  contract: Erc20;
  constructor(contract: Erc20) {
    this.contract = contract;
  }
  async symbol() {
    const symbol = await this.contract.methods.symbol().call();
    console.log(`symbol: ${symbol}`);
    return symbol;
  }
  async decimals() {
    const decimals = await this.contract.methods.decimals().call();
    console.log(`decimals: ${decimals}`);
    return decimals;
  }
  async balanceOf(address: string) {
    const balanceWei = await this.contract.methods.balanceOf(address).call();
    console.log(`balanceWei: ${balanceWei}`);
    return balanceWei;
  }
  async totalSupply() {
    const totalSupply = await this.contract.methods.totalSupply().call();
    console.log(`totalSupply: ${totalSupply}`);
    return totalSupply;
  }
}
