import 'mocha';
import { expect } from 'chai';
import { ActorPositionsFactory } from '../../../../ts/core/maps/ActorPositionsFactory';

describe('actorPositionsFactory.createFromJson()', () => {
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
                "draworder":"topdown",
                "id":2,
                "name":"objectLayer",
                "objects":[
                      {
                        "height":64,
                        "id":2,
                        "name":"",
                        "properties":[
                                {
                                "name":"actorId",
                                "type":"number",
                                "value": 20
                                }],
                        "rotation":0,
                        "type":"",
                        "visible":true,
                        "width":64,
                        "x":120,
                        "y":50
                      },
                      {
                        "height":64,
                        "id":1,
                        "name":"",
                        "properties":[
                                {
                                "name":"actorId",
                                "type":"number",
                                "value": 10
                                }],
                        "rotation":0,
                        "type":"",
                        "visible":true,
                        "width":64,
                        "x":640,
                        "y":384
                      }],
                "opacity":1,
                "type":"objectgroup",
                "visible":true,
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
      const actorEntries = ActorPositionsFactory.createFromJson(json);

      const firstEntry = actorEntries[0];

      expect(firstEntry.id).is.equal(2);
      expect(firstEntry.actorId).is.equal(20);
      expect(firstEntry.positon.x).is.equal(120);
      expect(firstEntry.positon.y).is.equal(50);
    });
  });
});
