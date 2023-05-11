/*eslint-env es6*/
/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['lodash']);
const Dotenv = require("dotenv-webpack");

module.exports = withTM({
  reactStrictMode: true,
  webpack: config => {
    config.plugins.push(new Dotenv({silent: true}));
    return config;
  }
});