package plugins;

import java.util.Collection;
import java.util.Map;
import java.util.TreeMap;

public class Model {

    String name;

    String tableName;

    String superClassName;

    boolean isMappedSuperClass = false;

    private Map<String, Member> members;

    public Model(String name) {

        this(name, name);
    }

    public Model(String name, String tableName) {

        this.name = name;
        this.tableName = tableName;
        this.members = new TreeMap<String, Member>();
    }

    public void addMember(String name, Member member) {

        members.put(name, member);
    }

    public Member getMember(String name) {

        return members.get(name);
    }

    public Collection<Member> getMembers() {

        return members.values();
    }

    public void removeMember(String name) {

        members.remove(name);
    }
}
