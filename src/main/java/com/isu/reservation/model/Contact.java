package com.isu.reservation.model;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;

// The Entity Contact
// Validations were made using annotations.

@Entity
@Table(name = "contact")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    @NotEmpty(message = "Name cannot be null or empty")
    private String name;

    @Column(name = "type")
    @NotEmpty(message = "Type cannot be null or empty")
    private String type;

    @Column(name = "phone")
    @NotEmpty(message = "Phone cannot be null or empty")
    private String phone;

    @Column(name = "birthday")
    @NotNull(message = "Birthday cannot be null or empty")
    @Past(message = "Cannot be borned in the future")
    private Timestamp birthday;

    // This 'cascade' allows me to delete Contacts without manual delete of his
    // reservations,
    // since it performs CRUD operations in cascade.
    // Place ForeignKey in Reservation, pointing to the User who owns it.
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "contact")
    private List<Reservation> reservations = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPhone() {
        return phone;
    }

    public void setBirthday(Timestamp birthday) {
        this.birthday = birthday;
    }

    public Timestamp getBirthday() {
        return birthday;
    }

}
