const cheerio = require('cheerio');
const rp = require('request-promise');
const {BLOG_URL}= require('../config');

const getHome = async (req, res) => {
  try {
    const options = {
      uri: BLOG_URL,
      transform: function(body) {
        return cheerio.load(body);
      },
    };
    const $ = await rp(options);
    const data = {
      nickname: $('.nickname').text(),
      description: $('.description').text(),
      links: $('.links .link-item').map(function infor() {
        return {
          [$(this).attr('title')]: $(this).attr('href'),
        };
      }).get(),
    };
    res.status(200).send(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getArchives = async (req, res) => {
  try {
    const options = {
      uri: BLOG_URL + 'archives',
      transform: function(body) {
        return cheerio.load(body);
      },
    };
    const $ = await rp(options);
    const data =$('.archive .archive-item .archive-item-link').map(function infor() {
      return {
        title: $(this).text(),
        url: $(this).attr('href'),
      };
    }).get();

    res.status(200).send(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getPost = async (req, res) => {
  try {
    const {slug} = req.query;
    const options = {
      uri: BLOG_URL + slug,
      transform: function(body) {
        return cheerio.load(body);
      },
    };
    const $ = await rp(options);
    const data = {
      title: $('.post-title').text(),
      content: $('.post-content').html(),
      date: $('.post-time a').text(),
    };
    res.status(200).send(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};


module.exports = {
  getHome,
  getArchives,
  getPost,
};
