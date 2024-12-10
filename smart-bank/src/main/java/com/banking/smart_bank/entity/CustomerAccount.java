package com.banking.smart_bank.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "customeraccount")
@Entity
public class CustomerAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double balance;

    @SuppressFBWarnings(
            value = "EI_EXPOSE_REP",
            justification = "JPA Entity.Exposing references is required by design."
    )
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore  // Prevents infinite recursion
    private User user;

    public String getAccountHolderName() {
        return user != null ? user.getFullname() : null;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
    @SuppressFBWarnings(
            value = "EI_EXPOSE_REP",
            justification = "JPA Entity.Exposing references is required by design."
    )
    public User getUser() {
        return user;
    }

    @SuppressFBWarnings(
            value = "EI_EXPOSE_REP",
            justification = "JPA Entity.Exposing references is required by design."
    )
    public void setUser(User user) {
        this.user = user;
    }
}

