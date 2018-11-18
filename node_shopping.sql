CREATE DATABASE `node_shopping` CHARSET=utf8;

USE `node_shopping`;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `price` double NOT NULL,
  `date` date NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  primary key(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `account` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`email` varchar(50) NOT NULL,
    `password` varchar(100) NOT NULL,
     PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `products` (`id`, `name`, `description`, `price`, `date`, `status`) VALUES
(1, 'Odio commodi', productsproductsproductsaccountaccount'Aliquid animi dolorem a minima et alias ea optio illo. Laboriosam est est velit aut asperiores', 44.5, '2016-09-15', 1),
(2, 'Iusto impedit', 'Nemo voluptas laboriosam repellendus hic dolore minima in rerum. Totam qui itaque quia sit sed eaque', 785.24, '2016-09-29', 1),
(3, 'Ut sunt et', 'Odit facere dolor doloremque neque similique ducimus beatae aut. Et molestiae aspernatur sint odio vel ut reprehenderit', 78, '2016-09-08', 1),
(4, 'Alias hic repellendus', 'Quod voluptatem sunt voluptate. Incidunt neque exercitationem quia. Vitae repellendus quia harum repellendus', 57, '2016-09-14', 1),
(5, 'Saepe delectus laborum', 'Dolorem aut qui sunt hic et dolor sit reprehenderit porro. Velit praesentium et modi aperiam distinctio ab labore ex', 955, '2016-09-14', 1),
(6, 'Voluptatem nostrum quae', 'Quis dolores voluptates dolores dicta. Rerum dolores qui odit. Ratione minus quia vitae quis', 77, '2016-09-21', 1),
(7, 'Voluptatem est nihil', 'Et molestias dolorem ut. Repudiandae eveniet dignissimos molestiae est adipisci iste unde ex', 314, '2016-09-14', 1),
(8, 'Cumque architecto', 'Dolorem et repellat sed velit veritatis delectus. Deleniti eveniet voluptatum natus ut ullam. Repellat consequatur non eligendi officiis eum veniam', 24, '2016-09-24', 1),
(9, 'Aut commodi occaecati', 'Repudiandae nihil sit incidunt. Qui minima maxime quibusdam. Quod doloribus accusantium voluptatem beatae enim nisi architecto. Harum rem veniam voluptatum', 32, '2016-09-16', 1),
(10, 'Eos modi', 'Veritatis similique est ut iusto sint. Rerum natus dolorem ipsa soluta voluptas sed et iste. Officiis est modi. Optio facilis sint commodi veritatis', 643, '2016-09-15', 1);


CREATE USER 'shopping'@'%' IDENTIFIED BY 'shopping';
GRANT ALL PRIVILEGES ON node_shopping.* TO 'shopping';
FLUSH PRIVILEGES;