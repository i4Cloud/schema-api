/*!
schemas-api 0.0.0, built on: 2017-03-30
Copyright (C) 2017 i4Cloud
http://i4Cloud.io/
https://github.com/i4Cloud/schemas-api

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/


'use strict';

var expect = require('chai').expect;
var lib = require('../src');

/*
 * USE MOCHA AND CHAI for testing your code
 */
describe('API server LIB', function () {
    it('Lib exports deploy function', () => {

        var result = lib.deploy;
        expect(result).to.not.be.null; // jshint ignore:line

    });
});