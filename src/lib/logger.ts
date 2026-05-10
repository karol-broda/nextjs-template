import { createEvlog } from 'evlog/next';
import { createInstrumentation } from 'evlog/next/instrumentation';
import { createUserAgentEnricher, createRequestSizeEnricher } from 'evlog/enrichers';
import { serviceName } from './config';

const enrichers = [createUserAgentEnricher(), createRequestSizeEnricher()];

export const { withEvlog, useLogger, log, createError, createEvlogError } = createEvlog({
  service: serviceName,
  redact: true,
  enrich: (ctx) => {
    for (const enricher of enrichers) enricher(ctx);
  },
});

export const { register, onRequestError } = createInstrumentation({
  service: serviceName,
  captureOutput: true,
});

export default log;
