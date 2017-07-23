// Copyright (C) 2017 Dmitry Chestnykh
// MIT License. See LICENSE file for details.

import { suite, test } from "mocha-typescript";
import { expect } from "chai";
import { AesSivExample } from "./support/test_vectors";

import SIV from "../src/sivchain";

@suite class SivSpec {
  static vectors: AesSivExample[];

  static async before() {
    this.vectors = await AesSivExample.loadAll();
  }

  @test async "AES-SIV: should correctly seal and open"() {
    for (let v of SivSpec.vectors) {
      const siv = await SIV.importKey(v.key, "AES-SIV", null);
      const sealed = await siv.seal(v.plaintext, v.ad);
      expect(sealed).to.eql(v.ciphertext);

      const unsealed = await siv.open(sealed, v.ad);
      expect(unsealed).not.to.be.null;
      expect(unsealed!).to.eql(v.plaintext);
      expect(() => siv.clean()).not.to.throw();
    }
  }
}
