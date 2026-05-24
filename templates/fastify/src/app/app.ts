import 'reflect-metadata';
import fastify from 'fastify';
import {
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { Configuration } from '@/config';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

try {
    await app.listen({ port: Configuration.PORT });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
