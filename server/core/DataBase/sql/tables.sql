CREATE TABLE `users` (
  `id`           int(11)    NOT NULL UNIQUE AUTO_INCREMENT,
  `login`        char(32)   NOT NULL UNIQUE,
  `password`     char(32)   NOT NULL,
  `date`         bigint(14) NOT NULL,
  `fullName`     char(32)   NOT NULL,
  `lastActivity` bigint(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `messages` (
    `id`          int(11)    NOT NULL UNIQUE AUTO_INCREMENT,
    `senderId`    int(11)    NOT NULL,
    `recipientId` int(11)    NOT NULL,
    `date`        bigint(14) NOT NULL,
    `text`        text       NOT NULL,
    `unread`      tinyint(1) NOT NULL DEFAULT 1,
    `deleted`     tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `auth` (
    `id`          int(11)    NOT NULL UNIQUE AUTO_INCREMENT,
    `userId`      int(11)    NOT NULL,
    `date`        bigint(14) NOT NULL,
    `active`      tinyint(1) NOT NULL,
    `cookieValue` char(64)   NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `activity` (
    `id`     int(11) NOT NULL UNIQUE AUTO_INCREMENT,
    `userId` int(11) NOT NULL,
    `date`   bigint(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;