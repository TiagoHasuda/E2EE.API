import type { Config } from 'jest';

const config: Config = {
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
    ],
    rootDir: "./",
    modulePaths: ["<rootDir>"],
    testRegex: ".*\\.test\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    collectCoverageFrom: [
        "**/src/**/*.(t|j)s",
        "**/test/**",
        "!**/dist/**",
        "!**/app/**",
        "!**/domain/**",
        "!**/*.module.ts",
        "!**/*.repository.ts",
        "!**/main.ts",
    ],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
};

export default config;