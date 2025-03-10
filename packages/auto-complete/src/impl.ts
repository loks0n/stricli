// Copyright 2024 Bloomberg Finance L.P.
// Distributed under the terms of the Apache 2.0 license.
import type { StricliAutoCompleteContext } from "./context";
import { forBash } from "./shells/bash";
import { forFish } from "./shells/fish";

export interface ShellManager {
    readonly install: (targetCommand: string, autocompleteCommand: string) => Promise<void>;
    readonly uninstall: (targetCommand: string) => Promise<void>;
}

export type Shell = "bash" | "fish";

export type ShellAutoCompleteCommands = Readonly<Partial<Record<Shell, string>>>;

export async function install(
    this: StricliAutoCompleteContext,
    flags: ShellAutoCompleteCommands,
    targetCommand: string,
): Promise<void> {
    if (flags.bash) {
        const bash = await forBash(this);
        await bash?.install(targetCommand, flags.bash);
    }
    if (flags.fish) {
        const fish = await forFish(this);
        await fish?.install(targetCommand, flags.fish);
    }
}

export type ActiveShells = Readonly<Partial<Record<Shell, boolean>>>;

export async function uninstall(
    this: StricliAutoCompleteContext,
    flags: ActiveShells,
    targetCommand: string,
): Promise<void> {
    if (flags.bash) {
        const shellManager = await forBash(this);
        await shellManager?.uninstall(targetCommand);
    }
    if (flags.fish) {
        const shellManager = await forFish(this);
        await shellManager?.uninstall(targetCommand);
    }
}
