use sakila;

-- 1a. Display the first and last names of all actors from the table actor.
SELECT first_name, last_name from actor;

-- 1b. Display the first and last name of each actor in a single column in upper case letters. Name the column Actor Name
SELECT UPPER(concat(first_name, last_name)) as "Actor Name" from actor;
-- 2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?
SELECT actor_id, first_name, last_name from actor where first_name = "Joe";

-- 2b. Find all actors whose last name contain the letters GEN:
SELECT * from actor where last_name LIKE '%GEN%';

-- 2c. Find all actors whose last names contain the letters LI. This time, order the rows by last name and first name, in that order:
SELECT * from actor where last_name LIKE '%LI%' order by last_name, first_name;

-- 2d. Using IN, display the country_id and country columns of the following countries: Afghanistan, Bangladesh, and China:
select country_id, country from country where country in ('Afghanistan', 'Bangladesh', 'China');

-- 3a. You want to keep a description of each actor. You don't think you will be performing queries on a description, so create a column in the table actor named description and use the data type BLOB (Make sure to research the type BLOB, as the difference between it and VARCHAR are significant).
ALTER TABLE actor ADD COLUMN description BLOB;
-- 3b. Very quickly you realize that entering descriptions for each actor is too much effort. Delete the description column.
ALTER TABLE actor DROP COLUMN description;
-- 4a. List the last names of actors, as well as how many actors have that last name.
select last_name, count(*) from actor GROUP BY last_name;
-- 4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors
select last_name, count(*) from actor GROUP BY last_name HAVING count(*) > 1;
-- 4c. The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS. Write a query to fix the record.
UPDATE actor set first_name = 'HARPO' where first_name = 'GROUCHO' AND last_name = 'WILLIAMS';
-- 4d. Perhaps we were too hasty in changing GROUCHO to HARPO. It turns out that GROUCHO was the correct name after all! In a single query, if the first name of the actor is currently HARPO, change it to GROUCHO.
UPDATE actor set first_name = 'GROUCHO' where first_name = 'HARPO' AND last_name = 'WILLIAMS';
-- 5a. You cannot locate the schema of the address table. Which query would you use to re-create it?
SHOW CREATE TABLE address;
-- 6a. Use JOIN to display the first and last names, as well as the address, of each staff member. Use the tables staff and address:
SELECT s.first_name, s.last_name, a.address from staff as s join address as a on s.address_id = a.address_id;
-- 6b. Use JOIN to display the total amount rung up by each staff member in August of 2005. Use tables staff and payment.
SELECT s.first_name, s.last_name, sum(p.amount) 
from staff as s 
join payment as p on s.staff_id = p.staff_id where date(p.payment_date) between '2005-08-00' and '2005-08-31' group by s.last_name;
-- 6c. List each film and the number of actors who are listed for that film. Use tables film_actor and film. Use inner join.
select f.title, count(a.actor_id) as 'Number of Actors'
from film as f
join film_actor as fa on fa.film_id = f.film_id
join actor as a on fa.actor_id = a.actor_id group by a.actor_id;
-- 6d. How many copies of the film Hunchback Impossible exist in the inventory system?
select count(*) from film as f join inventory i on f.film_id = i.film_id where f.title = 'Hunchback Impossible';
-- 6e. Using the tables payment and customer and the JOIN command, list the total paid by each customer. List the customers alphabetically by last name:
select c.last_name, count(p.amount) as 'Total Payment' from customer as c join payment as p on c.customer_id = p.customer_id group by last_name;
-- 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, films starting with the letters K and Q have also soared in popularity. 
-- Use subqueries to display the titles of movies starting with the letters K and Q whose language is English.

select film.title FROM film WHERE film.language_id in ( SELECT language.language_id FROM language where language.name = 'English') AND (film.title LIKE 'K%' OR film.title LIKE 'Q%');

-- 7b. Use subqueries to display all actors who appear in the film Alone Trip.

select * from actor where actor.actor_id in (select film_actor.actor_id from film_actor where film_actor.film_id in (select film_id from film where film.title = 'Alone Trip'));

-- 7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers. Use joins to retrieve this information.
 select first_name, last_name, email from customer join address on customer.address_id = address.address_id join city on address.city_id = city.city_id join country on city.country_id = country.country_id where country.country = 'Canada';

-- 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. Identify all movies categorized as family films.
select title from film join film_category on film.film_id = film_category.film_id join category on film_category.category_id = category.category_id where category.name = 'Family';
-- 7e. Display the most frequently rented movies in descending order.
select * from film join inventory on inventory.film_id = film.film_id join rental on rental.inventory_id = inventory.inventory_id order by  rental_date DESC;

-- 7f. Write a query to display how much business, in dollars, each store brought in.
select sum(payment.amount) from payment join staff on staff.staff_id = payment.staff_id join store on store.store_id = staff.store_id group by store.store_id; 
-- 7g. Write a query to display for each store its store ID, city, and country.
select store_id, city.city, country.country from store join address on store.address_id = address.address_id join city on address.city_id = city.city_id join country on country.country_id = city.country_id;
-- 7h. List the top five genres in gross revenue in descending order. (Hint: you may need to use the following tables: category, film_category, inventory, payment, and rental.)
select category.name, sum(payment.amount) from category join film_category on category.category_id = film_category.category_id 
join film on film.film_id = film_category.film_id join inventory on inventory.film_id = film.film_id join rental on rental.inventory_id = inventory.inventory_id join payment on payment.rental_id = rental.rental_id GROUP by (category.name) ORDER BY sum(payment.amount) LIMIT 5 OFFSET 5;
-- 8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. Use the solution from the problem above to create a view. If you haven't solved 7h, you can substitute another query to create a view.
CREATE VIEW top_five_genre AS
select category.name, sum(payment.amount) from category join film_category on category.category_id = film_category.category_id 
join film on film.film_id = film_category.film_id join inventory on inventory.film_id = film.film_id join rental on rental.inventory_id = inventory.inventory_id join payment on payment.rental_id = rental.rental_id GROUP by (category.name) ORDER BY sum(payment.amount) LIMIT 5 OFFSET 5;

-- 8b. How would you display the view that you created in 8a?
SELECT * FROM top_five_genre;
-- 8c. You find that you no longer need the view top_five_genres. Write a query to delete it.
DROP VIEW top_five_genre;