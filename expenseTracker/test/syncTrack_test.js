import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import { listExpenses, parseExpenses } from "../syncTrack.js";

const pseudoFiles = {
  fileWithArray: [],
  fileWithObjects: {},
  fileWithString: "string",
  fileWithNumber: 10,
  demoFile: [
    {
      category: "food",
      amount: 100,
      date: "something",
      description: "something",
    },
  ],
};

describe("test parseExpenses", () => {
  const oldRead = Deno.readTextFileSync;
  beforeAll(() => {
    Deno.readTextFileSync = (filePath) => JSON.stringify(pseudoFiles[filePath]);
  });
  afterAll(() => {
    Deno.readTextFileSync = oldRead;
  });
  it("when file contents is array should return an array after parsing", () => {
    assertEquals(parseExpenses("fileWithArray"), []);
  });
  it("when file contents is object should return an object after parsing", () => {
    assertEquals(parseExpenses("fileWithObjects"), {});
  });
  it("when file contents is string should return an string after parsing", () => {
    assertEquals(parseExpenses("fileWithString"), "string");
  });
  it("when file contents is number should return a number after parsing", () => {
    assertEquals(parseExpenses("fileWithNumber"), 10);
  });
});

describe("test listExpenses", () => {
  const oldRead = Deno.readTextFileSync;
  beforeAll(() => {
    Deno.readTextFileSync = (filePath) => JSON.stringify(pseudoFiles[filePath]);
  });
  afterAll(() => {
    Deno.readTextFileSync = oldRead;
  });
  it("when file contains valid expense", () => {
    assertEquals(listExpenses("demoFile"), [
      {
        category: "food",
        amount: 100,
        date: "something",
        description: "something",
      },
    ]);
  });
});
