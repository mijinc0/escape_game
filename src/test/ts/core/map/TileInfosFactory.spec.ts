import 'mocha';
import { expect } from 'chai';
import { TileInfosFactory } from '../../../../ts/core/maps/TileInfosFactory';

describe('TileInfosFactory.createFromJson()', () => {
  context('normal', () => {
    // Tiledのタイルセットデータ
    // https://www.mapeditor.org/
    const tiledJsonTilesetData = `
    { "columns":8,
      "editorsettings":
          {
          "export":
              {
              "format":"json",
              "target":"testtile.json"
              }
          },
      "image":"..\/..\/..\/assets\/map\/testtile.png",
      "imageheight":256,
      "imagewidth":512,
      "margin":0,
      "name":"testtile",
      "spacing":0,
      "tilecount":32,
      "tiledversion":"1.3.3",
      "tileheight":64,
      "tiles":[
              {
              "id":0,
              "properties":[
                      {
                      "name":"collide",
                      "type":"bool",
                      "value":true
                      }]
              }, 
              {
              "id":1,
              "properties":[
                      {
                      "name":"collide",
                      "type":"bool",
                      "value":true
                      }]
              }, 
              {
              "id":2,
              "properties":[
                      {
                      "name":"collide",
                      "type":"bool",
                      "value":true
                      }]
              }],
      "tilewidth":64,
      "type":"tileset",
      "version":1.2
      }`;

    it('can create', async () => {
      const json = JSON.parse(tiledJsonTilesetData);
      const tileInfos = TileInfosFactory.createFromJson(json);

      const firstInfo = tileInfos[0];

      expect(firstInfo.id).is.equal(0);
      expect(firstInfo.collide).is.true;
    });
  });
});