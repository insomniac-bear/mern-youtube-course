import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook.js';
import { AuthContext } from '../context/AuthContext.js';
import { Loader } from '../components/Loader.js';
import { LinksList } from '../components/LinksList.js';

export const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const {loading, request} = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${ token }`
      });
      setLinks(fetched);
    } catch (e) {};
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />
  }

  return <React.Fragment>
    { !loading && <LinksList links={ links } />}
  </React.Fragment>;
};
