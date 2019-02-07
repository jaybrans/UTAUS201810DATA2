from bs4 import BeautifulSoup as bs
from splinter import Browser
import os
import pandas as pd
import time
import lxml
import html5lib
from selenium import webdriver
from urllib.parse import urlsplit


def scrape():
    # %%
    mars_data = {}
    # %%
    # MARS
    my_path = {"executable_path": "C:\chromedriver_win32\chromedriver"}
    browser = Browser("chrome", **my_path)
    mars_url = "https://mars.nasa.gov/news/"
    browser.visit(mars_url)

    html = browser.html
    soup = bs(html, "html.parser")

    # %%
    # inspecting the html elements we can see what to query
    news_title = soup.find("div", class_="content_title")
    time.sleep(2)
    news_paragraph = soup.find("div", class_="article_teaser_body")
    time.sleep(5)
    # %%
    print("Title:" + news_title.text)
    print("Paragraph:" + news_paragraph.text)

    mars_data['news_title'] = news_title.text
    mars_data['news_paragraph'] = news_paragraph.text

    # %%
    # JPL MARS SPACE IMAGES
    url_image = "https://www.jpl.nasa.gov/spaceimages/?search=&category=featured#submit"
    browser.visit(url_image)
    base_url = "{0.scheme}://{0.netloc}/".format(urlsplit(url_image))
    print(base_url)
    mars_data['base_url'] = base_url
    xpath = "//*[@id=\"page\"]/section[3]/div/ul/li[1]/a/div/div[2]/img"
    # %%
    results = browser.find_by_xpath(xpath)
    img = results[0]
    img.click()

    # %%
    # get image url using BeautifulSoup
    # html_image = browser.html
    # soup = bs(html_image, "html.parser")
    # img_url = soup.find("img", class_="fancybox-image")
    # img_url_str = str(img_url['src'])
    # full_img_url = base_url + img_url_str
    # print(full_img_url)
    # mars_data['featured_image'] = full_img_url
    # %%
    # Mars Weather
    mars_weather_url = "https://twitter.com/marswxreport?lang=en"
    browser.visit(mars_weather_url)
    html_weather = browser.html
    html_weather_data = bs(html_weather, "html.parser")
    mars_weather = html_weather_data.find(
        "p", class_="TweetTextSize TweetTextSize--normal js-tweet-text tweet-text")
    time.sleep(2)

    print(mars_weather.text)
    mars_data['mars_weather'] = mars_weather.text

    # %%
    # Mars Facts
    url_facts = "https://space-facts.com/mars/"
    mars_data_table = pd.read_html(url_facts)

    print(mars_data_table[0])

    # %%
    df_mars_facts = mars_data_table[0]
    df_mars_facts.columns = ["Parameter", "Values"]
    df_mars_facts.set_index(["Parameter"])
    #mars_data['df_mars_facts'] = df_mars_facts

    # %%

    mars_html_table = df_mars_facts.to_html()
    mars_html_table = mars_html_table.replace("\n", "")
    mars_data['mars_table'] = mars_html_table

    # %%
    # Mars Hemispheres
    url_hemisphere = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(url_hemisphere)

    # %%
    hemisphere_base_url = "{0.scheme}://{0.netloc}/".format(
        urlsplit(url_hemisphere))
    print(hemisphere_base_url)

    # %%
    hemisphere_img_urls = []
    results = browser.find_by_xpath(
        "//*[@id='product-section']/div[2]/div[1]/a/img").click()
    time.sleep(2)
    browser.find_by_xpath(
        "//*[@id='wide-image-toggle']").click()
    time.sleep(2)
    cerberus_image = browser.html
    soup = bs(cerberus_image, "html.parser")
    cerberus_url = soup.find("img", class_="wide-image")["src"]
    cerberus_img_url = hemisphere_base_url + cerberus_url
    print(cerberus_img_url)
    cerberus_title = soup.find("h2", class_="title").text
    print(cerberus_title)
    browser.find_by_xpath(
        "//*[@id='splashy']/div[1]/div[1]/div[3]/section/a").click()
    cerberus = {"image title": cerberus_title, "image url": cerberus_img_url}
    hemisphere_img_urls.append(cerberus)

    # %%

    browser.find_by_xpath(
        "//*[@id='product-section']/div[2]/div[2]/a/img").click()
    time.sleep(2)
    browser.find_by_xpath(
        "//*[@id='wide-image-toggle']").click()
    time.sleep(2)
    schiaparelli_image = browser.html
    soup = bs(schiaparelli_image, "html.parser")
    schiaparelli_url = soup.find("img", class_="wide-image")["src"]
    schiaparelli_img_url = hemisphere_base_url + schiaparelli_url
    print(schiaparelli_img_url)
    schiaparelli_title = soup.find("h2", class_="title").text
    time.sleep(2)
    print(schiaparelli_title)
    browser.find_by_xpath(
        "//*[@id='splashy']/div[1]/div[1]/div[3]/section/a").click()
    time.sleep(2)
    schiaparelli = {"image title": schiaparelli_title,
                    "image url": schiaparelli_img_url}
    hemisphere_img_urls.append(schiaparelli)

    # %%
    browser.find_by_xpath(
        "//*[@id='product-section']/div[2]/div[3]/a/img").click()
    time.sleep(2)
    browser.find_by_xpath("//*[@id='wide-image-toggle']").click()
    time.sleep(2)
    syrtis_major_image = browser.html
    soup = bs(syrtis_major_image, "html.parser")
    syrtis_major_url = soup.find("img", class_="wide-image")["src"]
    syrtis_major_img_url = hemisphere_base_url + syrtis_major_url
    print(syrtis_major_img_url)
    syrtis_major_title = soup.find("h2", class_="title").text
    print(syrtis_major_title)
    browser.find_by_xpath(
        "//*[@id='splashy']/div[1]/div[1]/div[3]/section/a").click()
    syrtis_major = {"image title": syrtis_major_title,
                    "image url": syrtis_major_img_url}
    hemisphere_img_urls.append(syrtis_major)

    # %%
    browser.find_by_xpath(
        "//*[@id='product-section']/div[2]/div[4]/a/img").click()
    time.sleep(2)
    browser.find_by_xpath("//*[@id='wide-image-toggle']").click()
    time.sleep(2)
    valles_marineris_image = browser.html
    soup = bs(valles_marineris_image, "html.parser")
    soup.find("img", class_="wide-image")["src"]
    valles_marineris_img_url = hemisphere_base_url + syrtis_major_url
    print(valles_marineris_img_url)
    valles_marineris_title = soup.find("h2", class_="title").text
    print(valles_marineris_title)
    browser.find_by_xpath(
        "//*[@id='splashy']/div[1]/div[1]/div[3]/section/a").click()
    valles_marineris = {"image title": valles_marineris_title,
                        "image url": valles_marineris_img_url}
    hemisphere_img_urls.append(valles_marineris)

    # %%
    mars_data["hemisphere_imgs"] = hemisphere_img_urls
    return mars_data
    # %%
