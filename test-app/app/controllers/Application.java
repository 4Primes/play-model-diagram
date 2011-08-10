package controllers;

import play.*;
import play.data.validation.Required;
import play.mvc.*;
import plugins.ModelDiagramPlugin;

import java.util.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import models.*;

public class Application extends Controller {

	public static void index() {

		List<User> users = User.findAll();
		String json = new GsonBuilder().setPrettyPrinting().create()
				.toJson(ModelDiagramPlugin.models);
		render(users, json);
	}

	public static void save(@Required String username, @Required String fullname) {

		if (validation.hasErrors()) {
			params.flash();
			validation.keep();
		}

		else {
			User user = new User(username, fullname);
			user.save();
		}
		index();
	}

	public static void model() {
		String json = new Gson().toJson(ModelDiagramPlugin.models);
		render();
	}
}