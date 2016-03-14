import { mocha } from "meteor/avital:mocha";
import { chai } from "meteor/practicalmeteor:chai";
import { humanizedAge } from "./age";

const { assert } = chai;

describe('age', () => {
  describe('humanized', () => {
    it('computes second interval correctly', () => {
      const BASE = new Date("2013-09-20T10:10:10");
      assert.equal('1s', humanizedAge(new Date("2013-09-20T10:10:09"), BASE));
      assert.equal('2s', humanizedAge(new Date("2013-09-20T10:10:08"), BASE));
    });
    it('computes minute interval correctly', () => {
      const BASE = new Date("2013-09-20T10:10:10");
      assert.equal('1m', humanizedAge(new Date("2013-09-20T10:09:10"), BASE));
      assert.equal('2m', humanizedAge(new Date("2013-09-20T10:08:10"), BASE));
    });
    it('computes day interval correctly', () => {
      const BASE = new Date("2013-09-20T10:10:10");
      assert.equal('1d', humanizedAge(new Date("2013-09-19T10:10:10"), BASE));
      assert.equal('2d', humanizedAge(new Date("2013-09-18T10:10:10"), BASE));
    });
    it('computes year interval correctly', () => {
      const BASE = new Date("2013-09-20T10:10:10");
      assert.equal('1y', humanizedAge(new Date("2012-09-19T10:10:10"), BASE));
      assert.equal('2y', humanizedAge(new Date("2011-09-19T10:10:10"), BASE));
    });
  });
});
