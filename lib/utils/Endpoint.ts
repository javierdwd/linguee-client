import Lang from './Lang';

export const URL_COMPONENTS = {
  scheme: 'https://',
  host: 'www.linguee.com',
  path: '/',
  parameters: {
    source: 'auto',
    ajax: '1',
    query: '',
  },
};

export class Endpoint {
  static createSearchUrl(term = '', from = '', to = ''): string {
    term = term.toString().trim();

    const fromLang = Lang.get(from);
    const toLang = Lang.get(to);

    if (!term.length) {
      throw new Error('Empty term');
    }
    if (!fromLang) {
      throw new Error(`"from" parameter ("${from} language") is not available`);
    }
    if (!toLang) {
      throw new Error(`"to" parameter ("${to} language") is not available`);
    }

    const url = Endpoint.getURL();

    url.pathname = `${fromLang.name}-${toLang.name}/search/search`;

    url.searchParams.set('source', URL_COMPONENTS.parameters.source);
    url.searchParams.set('ajax', URL_COMPONENTS.parameters.ajax);
    url.searchParams.set('query', term);

    return url.toString();
  }

  static getURL(): URL {
    return new URL(
      `${URL_COMPONENTS.scheme}${URL_COMPONENTS.host}${URL_COMPONENTS.path}`
    );
  }

  static getDomain(): string {
    return Endpoint.getURL().toString();
  }
}

export default Endpoint;
