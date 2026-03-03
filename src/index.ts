#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();

program
  .name("nefbot")
  .description("NefCode Bot CLI - multi-provider coding agent (WIP)")
  .version("0.0.1");

program
  .command("hello")
  .description("Sanity check command")
  .option("-n, --name <name>", "Name to greet", "world")
  .action(({ name }: { name: string }) => {
    console.log(`hello, ${name}`);
  });

program
  .command("fail")
  .description("Exit with code 1 (sanity check for error handling)")
  .action(() => {
    console.error("intentional failure");
    process.exitCode = 1;
  });

program.parse();
