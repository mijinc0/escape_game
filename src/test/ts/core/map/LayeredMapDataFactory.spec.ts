import 'mocha';
import { expect } from 'chai';
import { LayeredMapDataFactory } from '../../../../ts/core/maps/LayeredMapDataFactory';

describe('LayeredMapDataFactory.createFromJson()', () => {
  context('normal', () => {
    // Tiledのマップデータ
    // https://www.mapeditor.org/
    const tiledJsonMapData = `
      { "compressionlevel":-1,
        "editorsettings":
          {
            "export":
              {
                "format":"json",
                "target":"testmap.json"
              }
          },
        "height":10,
        "infinite":false,
        "layers":[
              {
                "data":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
                "height":2,
                "id":1,
                "name":"layer-1",
                "opacity":1,
                "type":"tilelayer",
                "visible":true,
                "width":10,
                "x":0,
                "y":0
              }, 
              {
                "data":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
                "height":2,
                "id":0,
                "name":"baseLayer",
                "opacity":1,
                "type":"tilelayer",
                "visible":true,
                "width":10,
                "x":0,
                "y":0
              }],
        "nextlayerid":5,
        "nextobjectid":19,
        "orientation":"orthogonal",
        "renderorder":"right-down",
        "tiledversion":"1.3.3",
        "tileheight":64,
        "tilesets":[
              {
                "firstgid":1,
                "source":"..\/..\/..\/..\/tiled\/testtile.tsx"
              }],
        "tilewidth":64,
        "type":"map",
        "version":1.2,
        "width":30
      }`;

    it('can create', async () => {
      const json = JSON.parse(tiledJsonMapData);
      const layerdMapData = LayeredMapDataFactory.createFromJson(json);

      const expectedLayer0 = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      ].join('|');

      const expectedLayer1 = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      ].join('|');

      expect(layerdMapData[0].data.join('|')).is.equal(expectedLayer0);
      expect(layerdMapData[1].data.join('|')).is.equal(expectedLayer1);
    });
  });
});
