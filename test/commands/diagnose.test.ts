import { expect, test } from "@oclif/test";

describe("hello", () => {
  test
    .stdout()
    .command(["hello", "--name", "jeff"])
    .it("runs hello --name jeff", (ctx) => {
      expect(ctx.stdout).to.contain("hello jeff");
    });
});
