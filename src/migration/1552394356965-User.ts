import { MigrationInterface, QueryRunner } from 'typeorm'

export class User1552394356965 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `login` varchar(255) NOT NULL, `email` varchar(100) NOT NULL, `firstName` varchar(80) NOT NULL, `lastName` varchar(80) NULL, `password` varchar(255) NOT NULL, UNIQUE INDEX `IDX_a62473490b3e4578fd683235c5` (`login`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB')
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`')
        await queryRunner.query('DROP INDEX `IDX_a62473490b3e4578fd683235c5` ON `user`')
        await queryRunner.query('DROP TABLE `user`')
    }
}
