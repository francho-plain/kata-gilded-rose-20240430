import { pathsToModuleNameMapper } from  "ts-jest";

export default {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper({
    "@/*": [
      "src/*"
    ]
  }, { prefix: '<rootDir>/' } ),
};