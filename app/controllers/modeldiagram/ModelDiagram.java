package controllers.modeldiagram;

import java.lang.reflect.Field;

import org.omg.CORBA.PUBLIC_MEMBER;

import com.google.gson.FieldNamingStrategy;
import com.google.gson.GsonBuilder;

import play.mvc.*;
import plugins.ModelDiagramPlugin;

public class ModelDiagram extends Controller {

    public static void index() {
    	
        String json = new GsonBuilder().setPrettyPrinting().serializeNulls().create().toJson(ModelDiagramPlugin.models);
        render(json);
    }

}
