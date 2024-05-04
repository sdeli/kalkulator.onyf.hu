"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const Tag_1 = require("./entity/Tag");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Video_1 = require("./entity/Video");
const Upload_1 = require("./entity/Upload");
const VideoFinderRun_1 = require("./entity/VideoFinderRun");
const User_1 = require("./entity/User");
const BannedAccount_1 = require("./entity/BannedAccount");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "sandor",
    password: "pass",
    database: "london",
    synchronize: true,
    logging: false,
    entities: [VideoFinderRun_1.VideoFinderRun, Video_1.Video, Upload_1.Upload, Tag_1.Tag, User_1.User, BannedAccount_1.BannedAccount],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map