package controllers;

import play.*;
import play.data.validation.Required;
import play.mvc.*;
import plugins.MyPlugin;

import java.util.*;

import models.*;

public class Application extends Controller {

    public static void index() {

        List<User> users = User.findAll();
        render(users);
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
}