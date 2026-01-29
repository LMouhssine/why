# why

A local CLI tool for capturing the human reasoning behind technical decisions.

## Problem

Code changes. Teams change. Six months from now, you'll look at a decision and wonder why you made it. Comments decay. Documentation drifts. The context disappears.

This tool helps you record the reasoning behind decisions while it's still fresh.

## What This Is Not

- Not a code analyzer or linter
- Not a documentation generator
- Not a decision-making framework
- Not a replacement for comments, docs, or commit messages
- Not a collaboration or sharing platform

It doesn't analyze code, enforce practices, or make decisions. It records what you tell it.

## Core Idea

- Capture the context, intent, constraints, and trade-offs behind technical decisions
- Store them locally, in plain text, tied to your project
- Retrieve them later when you need to understand past reasoning
- Reduce lost context by externalizing the "why" before you forget

## Example Usage

```sh
# Record a decision (interactive)
why add

# List past decisions
why list

# View a specific decision
why show 1
```

## Disclaimer

This is a personal project in early development. Use at your own risk. No guarantees of stability, backwards compatibility, or ongoing support. It may change or break without notice.

## License

Licensed under the Apache License 2.0. See the LICENSE file for details.
